```tsx
"use client";

import { useState, useEffect } from "react";

type SpendItem = {
  id: number;
  tool: string;
  category: string;
  spend: number;
  date: string;
  status: string;
};

export default function Home() {
  const [items, setItems] = useState<SpendItem[]>([]);
  const [tool, setTool] = useState("");
  const [category, setCategory] = useState("");
  const [spend, setSpend] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const [filterTool, setFilterTool] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("spendItems");

    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems([
        {
          id: 1,
          tool: "ChatGPT",
          category: "AI Assistant",
          spend: 25,
          date: "2025-09-01",
          status: "Active",
        },
        {
          id: 2,
          tool: "Claude",
          category: "AI Assistant",
          spend: 35,
          date: "2025-09-05",
          status: "Active",
        },
        {
          id: 3,
          tool: "GitHub Copilot",
          category: "Developer Tool",
          spend: 19,
          date: "2025-09-10",
          status: "Active",
        },
        {
          id: 4,
          tool: "Notion AI",
          category: "Productivity",
          spend: 10,
          date: "2025-09-12",
          status: "Inactive",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("spendItems", JSON.stringify(items));
    }
  }, [items]);

  const addItem = () => {
    if (!tool || !category || !spend || !date || !status) {
      alert("Please fill all fields");
      return;
    }

    const newItem: SpendItem = {
      id: Date.now(),
      tool,
      category,
      spend: Number(spend),
      date,
      status,
    };

    setItems([...items, newItem]);

    setTool("");
    setCategory("");
    setSpend("");
    setDate("");
    setStatus("");
    setShowForm(false);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    const toolMatch =
      filterTool === "All" || item.tool === filterTool;

    const categoryMatch =
      filterCategory === "All" || item.category === filterCategory;

    const statusMatch =
      filterStatus === "All" || item.status === filterStatus;

    return toolMatch && categoryMatch && statusMatch;
  });

  const totalSpend = filteredItems.reduce(
    (sum, item) => sum + item.spend,
    0
  );

  const activeTools = filteredItems.filter(
    (item) => item.status === "Active"
  ).length;

  const categories = Array.from(
    new Set(items.m
```
