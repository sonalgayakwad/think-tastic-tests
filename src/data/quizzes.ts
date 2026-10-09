import { Brain, Cpu, Globe2, Code2, Binary, type LucideIcon } from "lucide-react";

export type Difficulty = "easy" | "medium" | "hard";
export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
export const SECONDS_PER_QUESTION: Record<Difficulty, number> = { easy: 30, medium: 25, hard: 20 };

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  answer: number; // index of correct option
  difficulty: Difficulty;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  questions: Question[];
}

type Raw = [string, [string, string, string, string], number];
const build = (prefix: string, d: Difficulty, rows: Raw[]): Question[] =>
  rows.map(([question, options, answer], i) => ({ id: `${prefix}-${d}-${i}`, question, options, answer, difficulty: d }));

export const CATEGORIES: Category[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    description: "Machine learning, neural networks and the ideas behind intelligent systems.",
    icon: Brain,
    questions: [
      ...build("ai", "easy", [
        ["What does 'AI' stand for?", ["Automated Input", "Artificial Intelligence", "Advanced Internet", "Analog Interface"], 1],
        ["Which of these is a common AI assistant feature?", ["Voice recognition", "Paper printing", "Battery charging", "Screen cleaning"], 0],
        ["Machine Learning is a subset of which field?", ["Networking", "Databases", "Artificial Intelligence", "Graphics"], 2],
        ["What do we call data used to teach an ML model?", ["Testing data", "Training data", "Meta data", "Cache data"], 1],
        ["A chatbot mainly interacts with users through…", ["Conversation", "Spreadsheets", "Hardware ports", "Firmware"], 0],
      ]),
      ...build("ai", "medium", [
        ["Which learning type uses labelled data?", ["Unsupervised", "Reinforcement", "Supervised", "Clustering"], 2],
        ["Basic units of a neural network are called…", ["Neurons", "Pixels", "Threads", "Packets"], 0],
        ["Which algorithm groups data into K clusters?", ["Linear Regression", "K-Means", "Decision Tree", "Naive Bayes"], 1],
        ["NLP stands for…", ["Network Layer Protocol", "Natural Language Processing", "New Logic Program", "Numeric Linear Processing"], 1],
        ["Model performing well on training but poorly on new data is…", ["Underfitting", "Overfitting", "Normalising", "Encoding"], 1],
      ]),
      ...build("ai", "hard", [
        ["Which function is commonly used as an activation: max(0, x)?", ["Sigmoid", "Tanh", "ReLU", "Softmax"], 2],
        ["Backpropagation computes gradients using the…", ["Chain rule", "Pythagoras theorem", "Bayes rule only", "Fourier transform"], 0],
        ["The 'Transformer' architecture relies mainly on…", ["Convolution", "Attention", "Recursion trees", "Genetic search"], 1],
        ["In reinforcement learning, the agent maximises…", ["Loss", "Cumulative reward", "Latency", "Entropy of input"], 1],
        ["Precision = TP divided by…", ["TP + FN", "TP + FP", "TN + FP", "All samples"], 1],
      ]),
    ],
  },
  {
    id: "cs",
    name: "Computer Science",
    description: "Core concepts: hardware, operating systems, networks and data structures.",
    icon: Cpu,
    questions: [
      ...build("cs", "easy", [
        ["CPU stands for…", ["Central Processing Unit", "Computer Power Unit", "Central Program Utility", "Core Processing Utility"], 0],
        ["Which is an input device?", ["Monitor", "Printer", "Keyboard", "Speaker"], 2],
        ["1 byte equals how many bits?", ["4", "8", "16", "32"], 1],
        ["RAM is a type of…", ["Permanent storage", "Volatile memory", "Input device", "Network cable"], 1],
        ["Which of these is an operating system?", ["Linux", "Python", "HTML", "Oracle Forms"], 0],
      ]),
      ...build("cs", "medium", [
        ["Which data structure follows LIFO?", ["Queue", "Stack", "Array", "Graph"], 1],
        ["Binary of decimal 10 is…", ["1010", "1001", "1100", "0110"], 0],
        ["Which layer of the OSI model handles routing?", ["Transport", "Network", "Session", "Physical"], 1],
        ["Default port of HTTPS is…", ["80", "21", "443", "8080"], 2],
        ["SQL is mainly used for…", ["Styling pages", "Managing databases", "Compiling C", "Drawing graphics"], 1],
      ]),
      ...build("cs", "hard", [
        ["Average time complexity of binary search is…", ["O(n)", "O(log n)", "O(n log n)", "O(1)"], 1],
        ["Which scheduling algorithm can cause starvation?", ["Round Robin", "FCFS", "Shortest Job First", "None"], 2],
        ["Deadlock requires all EXCEPT…", ["Mutual exclusion", "Hold and wait", "Preemption", "Circular wait"], 2],
        ["Which normal form removes transitive dependencies?", ["1NF", "2NF", "3NF", "None"], 2],
        ["Worst-case time of quicksort is…", ["O(n log n)", "O(n²)", "O(log n)", "O(n)"], 1],
      ]),
    ],
  },
  {
    id: "gk",
    name: "General Knowledge",
    description: "World facts, science, geography and everyday curiosities.",
    icon: Globe2,
    questions: [
      ...build("gk", "easy", [
        ["Which planet is known as the Red Planet?", ["Venus", "Mars", "Jupiter", "Saturn"], 1],
        ["How many continents are there?", ["5", "6", "7", "8"], 2],
        ["What is the capital of India?", ["Mumbai", "Kolkata", "New Delhi", "Chennai"], 2],
        ["Water freezes at what temperature (°C)?", ["0", "10", "-10", "100"], 0],
        ["Largest ocean on Earth?", ["Atlantic", "Indian", "Arctic", "Pacific"], 3],
      ]),
      ...build("gk", "medium", [
        ["Chemical symbol of gold is…", ["Go", "Gd", "Au", "Ag"], 2],
        ["Who wrote 'Romeo and Juliet'?", ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], 1],
        ["Longest river in the world (commonly cited)?", ["Amazon", "Nile", "Yangtze", "Ganga"], 1],
        ["How many bones in an adult human body?", ["206", "201", "212", "196"], 0],
        ["Which gas do plants absorb for photosynthesis?", ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"], 2],
      ]),
      ...build("gk", "hard", [
        ["Speed of light is about how many km/s?", ["3,000", "30,000", "300,000", "3,000,000"], 2],
        ["Smallest country by area?", ["Monaco", "Vatican City", "San Marino", "Malta"], 1],
        ["Hardest natural substance?", ["Iron", "Quartz", "Diamond", "Granite"], 2],
        ["Which element has atomic number 1?", ["Helium", "Hydrogen", "Oxygen", "Lithium"], 1],
        ["The Great Barrier Reef is located off which country?", ["Brazil", "Australia", "Indonesia", "South Africa"], 1],
      ]),
    ],
  },
  {
    id: "web",
    name: "Web Development",
    description: "HTML, CSS, JavaScript and how modern websites are built.",
    icon: Code2,
    questions: [
      ...build("web", "easy", [
        ["HTML stands for…", ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Mode Language", "Home Tool Markup Language"], 0],
        ["Which language styles web pages?", ["HTML", "CSS", "SQL", "C"], 1],
        ["Tag used for the largest heading?", ["<h6>", "<head>", "<h1>", "<header>"], 2],
        ["Which tag creates a hyperlink?", ["<a>", "<link>", "<href>", "<url>"], 0],
        ["JavaScript runs mainly in the…", ["Printer", "Browser", "Router", "BIOS"], 1],
      ]),
      ...build("web", "medium", [
        ["CSS property to change text colour?", ["font-color", "text-color", "color", "foreground"], 2],
        ["Which keyword declares a block-scoped variable in JS?", ["var", "let", "static", "define"], 1],
        ["Flexbox: which property aligns items on the main axis?", ["align-items", "justify-content", "flex-wrap", "order"], 1],
        ["HTTP status 404 means…", ["Server error", "Not Found", "Redirect", "OK"], 1],
        ["Which attribute gives alternative text for an image?", ["title", "src", "alt", "href"], 2],
      ]),
      ...build("web", "hard", [
        ["typeof null in JavaScript returns…", ["'null'", "'undefined'", "'object'", "'number'"], 2],
        ["Which CSS unit is relative to the root font size?", ["em", "rem", "px", "vh"], 1],
        ["Result of '2' + 2 in JavaScript?", ["4", "'22'", "NaN", "Error"], 1],
        ["Which HTTP method is idempotent and used to replace a resource?", ["POST", "PUT", "PATCH", "CONNECT"], 1],
        ["React re-renders a component when its… changes", ["CSS file", "State or props", "Filename", "Port"], 1],
      ]),
    ],
  },
  {
    id: "prog",
    name: "Programming Fundamentals",
    description: "Variables, loops, functions and logic that every coder needs.",
    icon: Binary,
    questions: [
      ...build("prog", "easy", [
        ["A named storage for data in a program is a…", ["Loop", "Variable", "Compiler", "Comment"], 1],
        ["Which symbol often starts a single-line comment in C/Java?", ["#", "//", "<!--", "**"], 1],
        ["Which loop runs at least once?", ["for", "while", "do-while", "foreach"], 2],
        ["'True' and 'False' are values of which type?", ["Integer", "String", "Boolean", "Float"], 2],
        ["What does an 'if' statement do?", ["Repeats code", "Makes a decision", "Declares a class", "Imports a file"], 1],
      ]),
      ...build("prog", "medium", [
        ["Array indexes in C, Java and JS start at…", ["0", "1", "-1", "Any"], 0],
        ["Result of 7 % 3?", ["2", "1", "0", "2.33"], 1],
        ["A function calling itself is called…", ["Iteration", "Recursion", "Overloading", "Casting"], 1],
        ["Which is NOT an OOP principle?", ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"], 2],
        ["Converting one data type to another is called…", ["Typecasting", "Hashing", "Parsing tree", "Linking"], 0],
      ]),
      ...build("prog", "hard", [
        ["Value of 5 / 2 in integer division (C/Java)?", ["2.5", "2", "3", "Error"], 1],
        ["Which concept lets a subclass provide its own version of a parent method?", ["Overloading", "Overriding", "Abstraction", "Binding"], 1],
        ["Short-circuit: in (false && f()), f() is…", ["Always called", "Never called", "Called twice", "Undefined"], 1],
        ["Stack overflow is commonly caused by…", ["Infinite recursion", "Too many comments", "Long variable names", "Using arrays"], 0],
        ["Bitwise 6 & 3 equals…", ["2", "7", "5", "1"], 0],
      ]),
    ],
  },
];

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);
export const TOTAL_QUESTIONS = CATEGORIES.reduce((n, c) => n + c.questions.length, 0);
export const TOTAL_QUIZZES = CATEGORIES.length * DIFFICULTIES.length;
