
// Mock data for development purposes

export interface Blog {
  id: string;
  title: string;
  category: string;
  author: string;
  authorId: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export const categories = [
  "Career",
  "Finance",
  "Travel",
  "Technology",
  "Health",
  "Lifestyle",
  "Food"
];

export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "10 Tips for Landing Your Dream Job",
    category: "Career",
    author: "John Smith",
    authorId: "3",
    content: `
    # 10 Tips for Landing Your Dream Job

    Finding and securing your dream job can seem like a daunting task, but with the right approach, you can increase your chances of success.

    ## 1. Define Your Career Goals

    Before diving into the job search, take some time to reflect on what you truly want from your career. What kind of work environment do you thrive in? What skills do you want to use or develop? Understanding your goals will help you target the right opportunities.

    ## 2. Build a Strong Online Presence

    In today's digital world, employers often research candidates online. Ensure your LinkedIn profile is up-to-date and create professional social media accounts if relevant to your industry. Showcase your expertise and engage with industry content.

    ## 3. Tailor Your Resume and Cover Letter

    Customize your application materials for each position. Highlight experiences and skills that directly relate to the job requirements. Use keywords from the job listing to pass through applicant tracking systems.

    ## 4. Network Strategically

    Many job opportunities are never publicly advertised. Attend industry events, join professional organizations, and connect with people working in roles you aspire to. Informational interviews can provide valuable insights and potentially lead to job referrals.

    ## 5. Prepare Thoroughly for Interviews

    Research the company, practice common interview questions, and prepare examples that demonstrate your skills and accomplishments. Be ready to explain how you can contribute to the organization's success.
    `,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    createdAt: "2023-04-15T10:30:00Z",
    updatedAt: "2023-04-15T10:30:00Z"
  },
  {
    id: "2",
    title: "The Ultimate Guide to Personal Finance",
    category: "Finance",
    author: "Sarah Johnson",
    authorId: "4",
    content: `
    # The Ultimate Guide to Personal Finance

    Taking control of your finances doesn't have to be complicated. Follow these fundamental principles to build a solid financial foundation.

    ## Create a Budget and Stick to It

    The first step to financial stability is understanding where your money is going. Track your income and expenses for a month to get a clear picture of your spending habits. Then, create a budget that allocates funds to necessities, savings, and discretionary spending.

    ## Build an Emergency Fund

    Life is unpredictable, and having a financial buffer can prevent a short-term crisis from becoming a long-term disaster. Aim to save 3-6 months of living expenses in an easily accessible account.

    ## Pay Off High-Interest Debt

    Credit card debt and other high-interest loans can significantly hinder your financial progress. Prioritize paying off these debts while maintaining minimum payments on lower-interest obligations.

    ## Invest for the Long Term

    Once you have an emergency fund and have addressed high-interest debt, start investing for your future. Take advantage of retirement accounts and consider low-cost index funds for long-term growth.

    ## Continuously Educate Yourself

    Financial literacy is an ongoing journey. Stay informed about personal finance topics, tax laws, and investment strategies to make more informed decisions.
    `,
    image: "https://images.unsplash.com/photo-1579621970590-9d624316904b",
    createdAt: "2023-05-22T15:45:00Z",
    updatedAt: "2023-05-23T09:15:00Z"
  },
  {
    id: "3",
    title: "Exploring the Hidden Gems of Southeast Asia",
    category: "Travel",
    author: "Mike Chen",
    authorId: "5",
    content: `
    # Exploring the Hidden Gems of Southeast Asia

    Southeast Asia offers more than just the popular tourist destinations. Here are some lesser-known but equally mesmerizing places to visit.

    ## 1. Phong Nha-Ke Bang National Park, Vietnam

    Home to some of the world's largest cave systems, this UNESCO World Heritage site offers breathtaking landscapes and unique natural formations. The recently discovered Son Doong Cave is the largest cave in the world and offers limited expeditions for adventurous travelers.

    ## 2. Banaue Rice Terraces, Philippines

    Often called the "Eighth Wonder of the World," these 2,000-year-old terraces were carved into the mountains of Ifugao by ancestors of the indigenous people. Unlike other rice terraces, these follow the natural contours of the mountains.

    ## 3. Mergui Archipelago, Myanmar

    With over 800 islands scattered across the Andaman Sea, this remote archipelago offers pristine beaches, diverse marine life, and the opportunity to interact with the Moken, a sea nomad community with a unique way of life.

    ## 4. Sam Neua, Laos

    This remote town in northeastern Laos offers a glimpse into the country's revolutionary history. Visitors can explore the Viengxay Caves, which served as a hidden city during the Secret War, housing over 20,000 people for nearly a decade.

    ## 5. Kampot, Cambodia

    Known for its colonial architecture, riverside setting, and world-famous pepper, Kampot offers a relaxed atmosphere away from the crowds. Take a boat ride on the Praek Tuek Chhu River, visit pepper farms, or explore nearby Bokor National Park.
    `,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592",
    createdAt: "2023-06-10T08:20:00Z",
    updatedAt: "2023-06-10T08:20:00Z"
  },
  {
    id: "4",
    title: "Artificial Intelligence: The Future of Technology",
    category: "Technology",
    author: "Test User",
    authorId: "1",
    content: `
    # Artificial Intelligence: The Future of Technology

    Artificial Intelligence (AI) is rapidly transforming our world, influencing everything from how we work to how we live our daily lives.

    ## Understanding AI and Machine Learning

    At its core, AI refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. Machine learning, a subset of AI, enables systems to improve their performance based on the data they process without explicit programming.

    ## Current Applications of AI

    AI is already integrated into many aspects of our lives:

    - **Healthcare:** AI algorithms can analyze medical images to detect diseases like cancer often with greater accuracy than human physicians.
    
    - **Finance:** From fraud detection to algorithmic trading, AI is revolutionizing how financial institutions operate and make decisions.
    
    - **Transportation:** Self-driving cars and intelligent traffic management systems are making transportation safer and more efficient.
    
    - **Customer Service:** Chatbots and virtual assistants are handling customer inquiries, providing 24/7 support.

    ## Ethical Considerations

    As AI becomes more advanced, important ethical questions arise:

    - **Privacy:** AI systems often require vast amounts of data, raising concerns about data collection and usage.
    
    - **Bias:** AI systems can inadvertently perpetuate existing biases if trained on biased data.
    
    - **Autonomy:** As AI makes more decisions, questions about human oversight and accountability become crucial.

    ## The Future of AI

    The potential of AI is vast and still largely untapped. From quantum computing to neural interfaces, the next wave of AI innovations promises to further transform our society in ways we're just beginning to imagine.
    `,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    createdAt: "2023-07-05T14:10:00Z",
    updatedAt: "2023-07-06T11:25:00Z"
  },
  {
    id: "5",
    title: "Mindfulness Practices for Busy Professionals",
    category: "Health",
    author: "Alex Rivera",
    authorId: "6",
    content: `
    # Mindfulness Practices for Busy Professionals

    In today's fast-paced work environment, finding moments of calm can seem impossible. Yet, integrating mindfulness into your daily routine can significantly improve your well-being and productivity.

    ## The Science Behind Mindfulness

    Numerous studies have shown that regular mindfulness practice can reduce stress, improve focus, enhance emotional regulation, and even strengthen immune function. By training your attention to focus on the present moment without judgment, you can break the cycle of constant rumination and worry.

    ## Quick Mindfulness Exercises for the Workplace

    ### 1. Mindful Breathing (2 minutes)

    Sit comfortably with your feet flat on the floor. Close your eyes or maintain a soft gaze. Focus your attention on your breath, noticing the sensation of air moving in and out of your body. When your mind wanders, gently bring your attention back to your breath.

    ### 2. Body Scan (5 minutes)

    Starting from your toes and moving up to your head, pay attention to each part of your body. Notice any sensations, tension, or discomfort without trying to change them. This practice helps you reconnect with your physical self during a mentally demanding day.

    ### 3. Mindful Listening (1 minute)

    For one minute, focus exclusively on the sounds around you. Notice the qualities of each sound—pitch, volume, duration—without labeling them as "good" or "bad." This exercise trains your ability to pay attention and can be done during a conference call or meeting.

    ## Incorporating Mindfulness into Your Routine

    - **Morning Ritual:** Begin your day with a 5-minute meditation before checking emails or news.
    - **Transition Moments:** Use the time between meetings or tasks to take three conscious breaths.
    - **Digital Boundaries:** Set specific times to check emails and messages rather than responding to every notification.
    - **Mindful Eating:** During lunch, focus solely on your food—its taste, texture, and aroma—rather than working while eating.

    ## The Mindful Leader

    Practicing mindfulness not only benefits your personal well-being but can also enhance your leadership abilities. Mindful leaders demonstrate greater emotional intelligence, make more considered decisions, and create psychologically safer work environments for their teams.
    `,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    createdAt: "2023-08-18T09:45:00Z",
    updatedAt: "2023-08-19T16:30:00Z"
  }
];

// Mock API functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchBlogs = async (filters?: { category?: string; author?: string }): Promise<Blog[]> => {
  await delay(500); // Simulate network delay
  
  let filteredBlogs = [...mockBlogs];
  
  if (filters?.category) {
    filteredBlogs = filteredBlogs.filter(blog => blog.category === filters.category);
  }
  
  if (filters?.author) {
    filteredBlogs = filteredBlogs.filter(blog => blog.author === filters.author);
  }
  
  return filteredBlogs;
};

export const fetchBlogById = async (id: string): Promise<Blog | undefined> => {
  await delay(300);
  return mockBlogs.find(blog => blog.id === id);
};

export const createBlog = async (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog> => {
  await delay(500);
  
  const newBlog: Blog = {
    ...blog,
    id: String(mockBlogs.length + 1),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockBlogs.push(newBlog);
  return newBlog;
};

export const updateBlog = async (id: string, updates: Partial<Blog>): Promise<Blog> => {
  await delay(500);
  
  const blogIndex = mockBlogs.findIndex(blog => blog.id === id);
  if (blogIndex === -1) {
    throw new Error("Blog not found");
  }
  
  mockBlogs[blogIndex] = {
    ...mockBlogs[blogIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return mockBlogs[blogIndex];
};

export const deleteBlog = async (id: string): Promise<void> => {
  await delay(500);
  
  const blogIndex = mockBlogs.findIndex(blog => blog.id === id);
  if (blogIndex === -1) {
    throw new Error("Blog not found");
  }
  
  mockBlogs.splice(blogIndex, 1);
};
