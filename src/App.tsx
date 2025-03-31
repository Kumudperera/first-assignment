import { useState } from "react";
import "./App.css";
import { Card } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Divider } from "./components/ui/divider";
import { Button } from "./components/ui/button";
import { PageItem } from "./components/page-item";
import DragToScroll from "./components/drag-scroll";

function App() {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  const pages = [1, 2, 3, 4, 5, 6];

  const toggleAllPages = () => {
    if (allSelected) {
      setSelectedPages([]);
      setAllSelected(false);
    } else {
      setSelectedPages([...pages]);
      setAllSelected(true);
    }
  };

  const togglePage = (pageNumber: number) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
      setAllSelected(false);
    } else {
      const newSelected = [...selectedPages, pageNumber];
      setSelectedPages(newSelected);
      if (newSelected.length === pages.length) {
        setAllSelected(true);
      }
    }
  };

  const handleDone = () => {
    console.log("Selected pages:", selectedPages);
  };

  return (
    <div className="container">
      <Card style={{ width: "370px" }}>
        <Checkbox
          label="All pages"
          checked={allSelected}
          onChange={toggleAllPages}
        />

        <Divider />

        <DragToScroll className="page-list">
          {pages.map((page) => (
            <PageItem
              key={page}
              pageNumber={page}
              selected={selectedPages.includes(page)}
              onToggle={togglePage}
            />
          ))}
        </DragToScroll>

        <Divider />

        <Button variant="yellow" onClick={handleDone}>
          Done
        </Button>
      </Card>
    </div>
  );
}
export default App;
