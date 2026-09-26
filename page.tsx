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
    new Set(items.map((item) => item.category))
  );

  const tools = Array.from(
    new Set(items.map((item) => item.tool))
  );

  const recommendations = [];

  for (const item of filteredItems) {
    if (
      item.tool === "ChatGPT" &&
      Number(item.spend) > 30
    ) {
      recommendations.push(
        "Consider reviewing your ChatGPT subscription because spending is relatively high."
      );
    }

    if (
      item.tool === "Claude" &&
      Number(item.spend) > 30
    ) {
      recommendations.push(
        "Claude spending is above $30. Consider checking whether the plan is fully utilized."
      );
    }

    if (
      item.tool === "GitHub Copilot" &&
      Number(item.spend) > 25
    ) {
      recommendations.push(
        "GitHub Copilot spending is high. Review usage before renewing."
      );
    }

    if (item.status === "Inactive") {
      recommendations.push(
        `${item.tool} is marked inactive. Consider cancelling unused subscriptions.`
      );
    }
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Your current AI/tool spending looks reasonable. Keep monitoring usage regularly."
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Spend Audit Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Monitor, analyze and optimize your AI tool spending.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Spend
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              ${totalSpend.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Active Tools
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {activeTools}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Tools
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {items.length}
            </h2>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Filters
            </h2>

            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
            >
              {showForm ? "Close" : "Add Tool"}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <select
              value={filterTool}
              onChange={(e) => setFilterTool(e.target.value)}
              className="rounded-lg border p-3"
            >
              <option value="All">All Tools</option>

              {tools.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value)
              }
              className="rounded-lg border p-3"
            >
              <option value="All">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value)
              }
              className="rounded-lg border p-3"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {showForm && (
          <div className="mb-6 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">
              Add New Tool
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Tool name"
                value={tool}
                onChange={(e) => setTool(e.target.value)}
                className="rounded-lg border p-3"
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="rounded-lg border p-3"
              />

              <input
                type="number"
                placeholder="Monthly spend"
                value={spend}
                onChange={(e) => setSpend(e.target.value)}
                className="rounded-lg border p-3"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-lg border p-3"
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="rounded-lg border p-3"
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button
              onClick={addItem}
              className="mt-4 rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
            >
              Add Tool
            </button>
          </div>
        )}

        <div className="mb-6 rounded-xl bg-white shadow">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">
              Spending Overview
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="p-4">Tool</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Spend</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-b-0"
                  >
                    <td className="p-4 font-medium">
                      {item.tool}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.category}
                    </td>

                    <td className="p-4">
                      ${item.spend.toFixed(2)}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.date}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-gray-500"
                    >
                      No tools found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Recommendations
          </h2>

          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-4 text-gray-700"
              >
                {recommendation}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
```
