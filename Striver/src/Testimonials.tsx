import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
 
export function Testimonials() {
  
  const testimonials = [
    {
      quote:
        "The step by step explanation of each question helped me immensely during my placement season. This is exactly what I have been looking for.",
      name: "Thomas Wang",
      designation: "SDE at Amazon",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I was struggling in DSA but one fine day i stumbled upon this website and it changed the course of my life.Thank You AlgoBuddy.",
      name: "Emily Watson ",
      designation: "Backend Developer at Microsoft",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I used this DSA platform every day during my final-year prep. By understanding the approaches provided by the bot I finally managed to secure a job at Google ",
      name: "Chris Evans",
      designation: "Full Stack Developer at Google",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        " I have just 3 words. Crisp, Concise and Beautiful.",
      name: "Chris Hemsworth",
      designation: "Data Analyst at Uber",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    
  ];
  return <>
    <p className="font-bold text-3xl text-center">Testimonials</p>
    <AnimatedTestimonials testimonials={testimonials} />
    </>;
}