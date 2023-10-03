## Web Security Assignment 3

### Overview

In this homework, we will explore the identification, exploitation and remediation server-side vulnerabilities through a specific vulnerability, prototype pollution. 

Assignment 3 will be presented in jeopardy-style CTF (Capture-The-Flag) format for more fun. Students will be provided with five web vulnerable applications (five challenges). The objective is to identify and exploit these vulnerabilities to achieve further severe consequences, such as Internal Property Tampering (IPT), Remote Code Execution (RCE), or Cross-Site Scripting (XSS), and retrieve the hidden flag stored on the server. In addition, you will also required to patch the identified vulnerabilities to secure the application.

### Submission & Grading

For the three challenges tagged with `baby`/`toddler` level, please adhere to the following steps:

1. Submit the flag through the CTF platform.

2. Provide a `.patch` file to rectify the vulnerable part.

    - To generate this `.patch`, use the command:

        `diff -u ./app.js ./app-patched.js > vuln.patch`

3. Write a brief writeup to explain the following content:

    + Where is the vulnerability and why it occurs
    + How to exploit the vulnerability and retrieve the flag
    + How the `.patch` file works

For the two challenges tagged with  `hard` tag, you are highly encouraged to solve them. Successfully solving each will award you 10 bonus points.

Ensure your submission is zipped and maintains the following directory structure:

```
submission.zip/
│
│── babyproto1/
│   └── vuln.patch
│── toddlerproto2/
│  	└── vuln.patch
│── my-sis-system/
│   └── vuln.patch
│── toddlerproto2-revenge/
│   └── vuln.patch
│── drink-some-coffee/
│   └── vuln.patch
└── solve.md
```

The grading of this assignment will be grounded in the submission record on the CTF platform, the writeup and the patch code. For a detailed rubric, please refer to Canvas.

### CTF Platform Guidelines

1. **Platform Access**:

    For this assignment, we've set up a dedicated CTF platform at:

    https://ctf.prototype-pollution.fun/

    Use this platform to access challenges, submit your solutions, and engage in some friendly competition!

2. **Registration**:

    Every student is required to register for an account. Please ensure you sign up using your JHU email, which has a domain ending in either `jh.edu` or `jhu.edu`. After registration, you'll be prompted to create a one-person team. While registering, provide your full name and JHED. As for the team name and username, feel free to get creative!

3. **Challenge Access**:

    You can view the description, source code, and remote instance address for each challenge under the `/challenge` route.

4. **Scoring Mechanism**:

    The visible score for each challenge will diminish as more flags are submitted. However, this score won't factor into the grading of this assignment. 

5. **Regarding Challenge Instance**:

    + Each requested challenge instance is dynamically constructed as an isolated pod (container). This ensures that players do not interfere with one another's sessions.

    + Constructing the challenge can take a bit, so patience is appreciated :> If it takes longer than 5 mins, please contact the CA through the following email.

    + You may mess up with the root prototype while exploiting. To counter this, a `/reset` API is available for each challenge, allowing you to revert to the default root prototype. Please use the api instead of terminate&fetch another instance.

    + If the application is broken due to the pollution, it should be restarted immediately.

    + For efficient resource utilization, please terminate the instance if you're done or taking a break.

    + If you encounter any issues regarding the process, please contact through this email:

        zliu192@jhu.edu
