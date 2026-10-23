"use client";

import type { ReactNode } from "react";
import { useRef, useState, type KeyboardEvent } from "react";

type ProductTab = "details" | "reviews" | "faqs";

export function ProductContentTabs({
  labels,
  details,
  reviews,
  faqs,
}: {
  labels: {
    tabs: string;
    details: string;
    reviews: string;
    faqs: string;
  };
  details: ReactNode;
  reviews: ReactNode;
  faqs: ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<ProductTab>("reviews");
  const tabRefs = useRef<Record<ProductTab, HTMLButtonElement | null>>({
    details: null,
    reviews: null,
    faqs: null,
  });
  const tabs: { id: ProductTab; label: string }[] = [
    { id: "details", label: labels.details },
    { id: "reviews", label: labels.reviews },
    { id: "faqs", label: labels.faqs },
  ];
  const panels: Record<ProductTab, ReactNode> = {
    details,
    reviews,
    faqs,
  };

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.findIndex(
      (tab) => tab.id === event.currentTarget.id.replace("product-tab-", ""),
    );
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  }

  return (
    <section className="mt-8 sm:mt-12">
      <div
        role="tablist"
        aria-label={labels.tabs}
        className="flex gap-6 overflow-x-auto border-b border-border sm:gap-8"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[tab.id] = element;
            }}
            id={`product-tab-${tab.id}`}
            type="button"
            role="tab"
            tabIndex={activeTab === tab.id ? 0 : -1}
            aria-selected={activeTab === tab.id}
            aria-controls={`product-panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={handleTabKeyDown}
            className={`shrink-0 border-b-2 pb-3 text-xs transition-colors sm:text-sm ${
              activeTab === tab.id
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        key={activeTab}
        id={`product-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`product-tab-${activeTab}`}
        tabIndex={0}
        className="animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        {panels[activeTab]}
      </div>
    </section>
  );
}
