import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent,
  ReactNode,
} from "react";
import "./drag-scroll.css";

interface DragToScrollProps {
  children: ReactNode;
  height?: string;
  width?: string;
  className?: string;
}

const DragToScroll: React.FC<DragToScrollProps> = ({
  children,
  height = "168px",
  width = "100%",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    setStartY(e.clientY);
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent<Document> | any): void => {
    if (!isDragging || !containerRef.current) return;

    const deltaY = e.clientY - startY;
    containerRef.current.scrollTop = scrollTop - deltaY;
    e.preventDefault();
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove as any);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove as any);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startY, scrollTop]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      style={{
        height,
        width,
        overflow: "auto",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className={`${className} drag-scroll-container`}
    >
      {children}
    </div>
  );
};

export default DragToScroll;
