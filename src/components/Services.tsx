import React from 'react';

const services = [
    {
        title: 'API Development & Integration',
        icon: '/images/api-svgrepo-com.svg', // replace with actual icon
        description: 'Building secure REST/GraphQL API, integrating third-party services, and handling authentication.',
    },
    {
        title: 'Database Design & Management',
        icon: '/images/database-svgrepo-com.svg',
        description: 'Designing scalable SQL/NoSQL databases, optimizing queries, and ensuring data consistency.',
    },
    {
        title: 'Cloud Services Integration',
        icon: '/images/aws.svg',
        description: 'Deploying scalable applications on AWS, automating CI/CD, and managing infrastructure.',
    },
    {
        title: 'Performance Optimization',
        icon: '/images/performance-up-graph-svgrepo-com.svg',
        description: 'Optimizing queries, caching data, load balancing, and improving application performance.',
    },
    {
        title: 'Web Scraping & Data Processing',
        icon: '/images/web-page-svgrepo-com.svg',
        description: 'Extracting, parsing, and storing data from websites for automation needs.',
    },
    {
        title: 'AI & ML Backend Integration',
        icon: '/images/ai-svgrepo-com.svg',
        description: 'Integrating AI models, vector search, and enabling intelligent backend functionalities.',
    },
];

export const Services: React.FC = () => (
    <section id="services" className="bg-[#111111] text-white py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
            <h2 className="text-3xl font-semibold mb-2">Services</h2>
            <p className="text-gray-400 mb-10">
                Lorem ipsum dolor sit amet consectetur. Imperdiet convallis blandit felis ligula aliquam
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => (
                    <div key={s.title} className="bg-[#1a1a1a] p-6 rounded-lg hover:bg-[#222222] transition">
                        <div className="mb-4">
                            <img src={s.icon} alt={s.title} className="w-12 h-12 mx-auto grayscale brightness-0" />
                        </div>
                        <h3 className="text-xl font-medium text-orange-500 mb-2 text-center">{s.title}</h3>
                        <p className="text-gray-500 text-sm text-center">{s.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
