export const metadata = {
  title: "Contact Urban Paparazzi",
  description: "Contact the Urban Paparazzi team in Nigeria.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 prose max-w-none">
      <h1>Contact Us</h1>
      <p>
        Reach out to the Urban Paparazzi team at{" "}
        <a href="mailto:hello@urbanpaparazzi.ng">hello@urbanpaparazzi.ng</a>.
      </p>
    </div>
  );
}
