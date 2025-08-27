import heroImage from "@/assets/images/hero-image.jpg";

export default function HeroSection() {
  return (
    // i want to set background image here
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{
        background: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)) ,url(${heroImage}) no-repeat center center fixed`,
      }}
    >
      <div className="flex flex-col gap-4 text-center" >
        <h1 className="text-3xl font-bold text-white md:text-5xl">
          Welcome to Our Digital Wallet
        </h1>
        <p className="text-primary-foreground">
          Experience the ease of digital money management with our user-friendly
          platform.
        </p>
      </div>
    </div>
  );
}
