import React, { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy, version as pdfjsVersion } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.mjs`;

interface ResumePreviewProps {
    file: File;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ file }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
    const renderTaskRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [textContent, setTextContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Reset state on new file
        setPdf(null);
        setCurrentPage(1);
        setNumPages(0);
        setTextContent(null);
        setError(null);
        setLoading(true);

        const loadFile = async () => {
            try {
                if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
                    const buffer = await file.arrayBuffer();
                    const loadingTask = getDocument({ data: buffer });
                    const pdfDoc = await loadingTask.promise;
                    setPdf(pdfDoc);
                    setNumPages(pdfDoc.numPages);
                } else {
                    // Assume text/markdown
                    const text = await file.text();
                    setTextContent(text);
                }
            } catch (err) {
                console.error("Error loading file:", err);
                setError("Failed to load file preview.");
            } finally {
                setLoading(false);
            }
        };

        loadFile();
    }, [file]);

    useEffect(() => {
        const renderPage = async () => {
            if (!pdf || !canvasRef.current) return;

            try {
                // Cancel existing render task if any
                if (renderTaskRef.current) {
                    await renderTaskRef.current.cancel();
                }

                const page = await pdf.getPage(currentPage);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");

                if (context) {
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };

                    const renderTask = page.render(renderContext);
                    renderTaskRef.current = renderTask;

                    await renderTask.promise;
                    renderTaskRef.current = null;
                }
            } catch (err: any) {
                // Ignore cancellation errors
                if (err.name === "RenderingCancelledException") {
                    return;
                }
                console.error("Error rendering page:", err);
                setError("Failed to render page.");
            }
        };

        if (pdf) {
            renderPage();
        }

        return () => {
            if (renderTaskRef.current) {
                renderTaskRef.current.cancel();
            }
        };
    }, [pdf, currentPage]);

    const changePage = (offset: number) => {
        setCurrentPage((prev) => Math.min(Math.max(prev + offset, 1), numPages));
    };

    if (loading) {
        return <div className="text-white/70 animate-pulse">Loading preview...</div>;
    }

    if (error) {
        return <div className="text-red-400">{error}</div>;
    }

    if (textContent !== null) {
        return (
            <div className="w-full h-full min-h-0 bg-white/5 rounded-xl p-4 overflow-y-auto border border-white/10">
                <pre className="text-sm text-white/90 whitespace-pre-wrap font-mono relative z-20">
                    {textContent}
                </pre>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <div className="relative w-full h-full overflow-y-auto bg-white/5 rounded-xl border border-white/10 flex justify-center p-4">
                {/* Canvas needs to be relative z-20 to be above background effects if any */}
                <canvas ref={canvasRef} className="shadow-lg rounded-sm max-w-full relative z-20" />
            </div>

            {numPages > 1 && (
                <div className="absolute bottom-6 right-6 flex items-center rounded-2xl border border-white/15 bg-white/30 p-6 backdrop-blur
                                gap-5 bg-black/30 px-5 py-2.5 border border-white/15 backdrop-blur 
                                shadow-xl font-Turbine z-30">
                    <button
                        onClick={() => changePage(-1)}
                        disabled={currentPage <= 1}
                        // className="text-black/50 hover:text-black/80 disabled:opacity-30 transition-colors text-xs tracking-widest capitalize font-bold"
                        className="text-black/80 hover:text-black/80 disabled:opacity-30 transition-all duration-200 ease-in-out text-xs tracking-widest capitalize font-bold transform hover:scale-105 active:scale-95"
                        >
                        Previous
                    </button>
                    <span className="text-xs text-black  tracking-widest">
                        {currentPage} / {numPages}
                    </span>
                    <button
                        onClick={() => changePage(1)}
                        disabled={currentPage >= numPages}
                        // className="text-black/50 hover:text-black/80 disabled:opacity-30 transition-colors text-xs tracking-widest capitalize font-bold"
                        className="text-black/80 hover:text-black/80 disabled:opacity-30 transition-all duration-200 ease-in-out text-xs tracking-widest capitalize font-bold transform hover:scale-105 active:scale-95"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};
