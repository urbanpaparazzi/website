export const metadata = {
  title: "About Urban Paparazzi",
  description:
    "Learn about Urban Paparazzi, a Nigerian magazine covering news, entertainment, lifestyle and culture.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 prose max-w-none">
      <h1>About Urban Paparazzi</h1>
      <p>
        Urban Paparazzi is the next generation Nigerian magazine, delivering
        credible news, entertainment videos, and engaging stories across
        entertainment, lifestyle, and culture.
      </p>
    </div>
  );
}
