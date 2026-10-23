export function ProductOverviewSection({
  title,
  productName,
  description,
  brandLabel,
  brand,
  categoryLabel,
  category,
  materialLabel,
  material,
  fitLabel,
  fit,
  careLabel,
  care,
}: {
  title: string;
  productName: string;
  description: string;
  brandLabel: string;
  brand: string;
  categoryLabel: string;
  category: string;
  materialLabel: string;
  material: string;
  fitLabel: string;
  fit: string;
  careLabel: string;
  care: string;
}) {
  const specifications = [
    [brandLabel, brand],
    [categoryLabel, category],
    [materialLabel, material],
    [fitLabel, fit],
    [careLabel, care],
  ];

  return (
    <section aria-labelledby="product-overview-title" className="py-5 sm:py-7">
      <h2
        id="product-overview-title"
        className="text-lg font-bold text-foreground sm:text-xl"
      >
        {title}
      </h2>
      <div className="mt-4 rounded-2xl border border-border bg-background p-4 sm:p-6">
        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          {productName}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <dl className="mt-5 divide-y divide-border">
          {specifications.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] gap-4 py-3 text-sm"
            >
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
