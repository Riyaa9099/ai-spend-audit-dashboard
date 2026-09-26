"use client";

import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AuditPage() {

  const [currency, setCurrency] = useState("$");

  const [tools, setTools] = useState([
    {
      tool: "ChatGPT",
      spend: "",
      teamSize: "",
    },
  ]);

  // LOAD SAVED DATA
  useEffect(() => {
    const savedTools = localStorage.getItem("tools");
    const savedCurrency = localStorage.getItem("currency");

    if (savedTools) {
      setTools(JSON.parse(savedTools));
    }

    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem("tools", JSON.stringify(tools));
    localStorage.setItem("currency", currency);
  }, [tools, currency]);

  // ADD TOOL
  const addTool = () => {
    setTools([
      ...tools,
      {
        tool: "Claude",
        spend: "",
        teamSize: "",
      },
    ]);
  };

  // REMOVE TOOL
  const removeTool = (index: number) => {
    const updated = tools.filter((_, i) => i !== index);
    setTools(updated);
  };

  // UPDATE TOOL
  const updateTool = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...tools];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setTools(updated);
  };

  // CALCULATIONS
  let totalSavings = 0;

  const recommendations = tools.map((item) => {

    let recommendation = "";
    let savings = 0;

    if (
      item.tool === "ChatGPT" &&
      Number(item.teamSize) <= 2 &&
      Number(item.spend) > 40
    ) {
      recommendation = "Switch to ChatGPT Plus";
      savings = Number(item.spend) - 40;
    }

    if (
      item.tool === "Cursor" &&
      Number(item.teamSize) <= 3 &&
      Number(item.spend) > 20
    ) {
      recommendation = "Downgrade to Cursor Pro";
      savings = Number(item.spend) - 20;
    }

    if (
      item.tool === "Claude" &&
      Number(item.spend) > 30
    ) {
