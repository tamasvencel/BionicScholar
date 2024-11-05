export const AboutSection: React.FC = () => {
  return (
    <section id='about' className='h-screen bg-neutral-800 flex items-center justify-center text-center px-5'>
      <div className='text-white max-w-md flex flex-col gap-2'>
        <h2 className='flex items-center gap-2 justify-center uppercase font-normal text-base'>
          <span className='w-2 h-2 bg-primary-100'></span>
          <span>Empowering researchers</span>
        </h2>
        <h1 className='text-4xl'>Transforming research reading</h1>
        <p className='font-thin text-medium'>
          BionicScholar is your ultimate research companion, designed to simplify and enhance your reading experience.
          We summarize research papers, structure them based on key points, and apply Bionic Reading techniques for
          improved comprehension. Whether you're a student, academic, or professional, our platform empowers you to
          grasp complex content quickly and efficiently. Dive into a world of knowledge with BionicScholar and transform
          the way you engage with research.
        </p>
      </div>
    </section>
  );
};
