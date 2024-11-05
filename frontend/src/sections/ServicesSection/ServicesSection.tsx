import { Card } from '../../components';
import service1 from '../../assets/images/service1.jpg';
import service2 from '../../assets/images/service2.jpg';
import service3 from '../../assets/images/service3.jpg';

export const ServicesSection: React.FC = () => {
  return (
    <section className='bg-primary flex justify-center'>
      <div className='py-10 my-14 max-w-min'>
        <div className='flex flex-col gap-2 mb-14  justify-center items-center text-center lg:items-start '>
          <div className='flex gap-1 items-center'>
            <span className='w-2 h-2 bg-secondary-600'></span>
            <h2 className='uppercase text-secondary-300 text-sm'>Streamlined research</h2>
          </div>
          <h1 className='text-4xl font-normal'>Transform your reading experience</h1>
        </div>
        <div className='flex flex-col lg:flex-row grow-0  gap-10 mt-8'>
          <Card
            src={service1}
            title='Research paper summarization'
            subtitle='Transform lengthy research papers
into concise summaries.'
          />
          <Card
            src={service2}
            title={'Structured reading'}
            subtitle={'Organize your research with structured keypoints.'}
          />
          <Card
            src={service3}
            title={'Bionic reading technique'}
            subtitle={'Enhance comprehension with the Bionic Reading method.'}
          />
        </div>
      </div>
    </section>
  );
};
