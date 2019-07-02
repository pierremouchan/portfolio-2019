export const state = () => ({
  list: [
    {
      id: 'SOCIALFORGOOD',
      title: 'SOCIAL',
      sliderTitle: ['SOCIAL', 'FOR GOOD'],
      date: '2019',
      mainTech: 'WEBGL',
      othersTech: ['THREEJS', 'ART DIRECTOR', 'INTERN'],
      mainDesc:
        'the purpose of SOCIAL FOR GOOD is to denounce harassment in general but more specifically harassment on social networks. I had the opportunity to work as a developer and an art director on this project. I decided to iterate his design and development and to add webGL in it.',
      secondDesc:
        'Having the idea to add THREEJS to this project completely chanded it, especially the user experience that we encounter exploring it. How it works ? How i added 3D to this experience ? I simply chose to add a scroll which is not vertical like a normal website but a scroll which works on the Z axis ( the depth). So the user scrolls inside the insults coming from the harassers and discover the victims. With this experience, i place the user inside this problem of harrassement, i give him an important place and a history to live and follow through it.',
      mainQuote: 'WORKING ON BOTH SIDE, <br> LEADS TO GOOD IDEAS',
      secondQuote: 'ADDING 3D COMPLETELY <br> CHANGE THE UX AND UI',
      mainImg: require('~/static/images/projects/socialforgood/social-main.jpg'),
      othersImg: [
        require('~/static/images/projects/socialforgood/social-full.jpg'),
        require('~/static/images/projects/socialforgood/social-aside1.jpg'),
        require('~/static/images/projects/socialforgood/social-aside2.jpg')
      ]
    },
    {
      id: 'FSIF',
      title: 'FSIF',
      sliderTitle: ['FÉDÉRATION', 'SOCIÈTÉ'],
      date: '2019',
      mainTech: 'WORDPRESS',
      othersTech: ['GSAP', 'PHP', 'INTERN'],
      mainDesc:
        '‘FSIF’ usually knowns as the ‘Fédération des sociétés immobilière et foncières’ asked us me and my team' +
        ' to develop a wordpress website as their image. This manageable website was made to describe their works, their history and their differents partners and adherents all  around the world.',
      secondDesc:
        'As an intern at Pixies Agency, it was my first ‘real experience’ with wordpress in a short period of time. I had to handle all the knowledges around this new technology for me, and deliver a complete website in just 1 month. This whole challenge gave me a clear vision of ‘how wordpress works and how to implement it in a website’.' +
        ' I still managed to go beyond these deadline and add little bit of life at this project with some animations.',
      mainQuote: 'DEALING WITH THE TIME, <br> IS MEETING THE DEVIL',
      secondQuote: 'FIRST ‘REAL BIG PROJECT’, <br> AS AN INTERN AT PIXIES',
      mainImg: require('~/static/images/projects/fsif/fsif-main.jpg'),
      othersImg: [
        require('~/static/images/projects/fsif/fsif-full.jpg'),
        require('~/static/images/projects/fsif/fsif-aside1.jpg'),
        require('~/static/images/projects/fsif/fsif-aside2.jpg')
      ]
    },
    {
      id: 'DESIGNING',
      title: 'DESIGNING',
      sliderTitle: ['3D ARTS', 'ABSTRACT'],
      date: '2018',
      mainTech: 'FREE-TIME',
      othersTech: ['C4D', 'THREEJS', 'ART'],
      mainDesc:
        'I like to spend my free time on different little works around the design and development. I like to express myself, exploit my creativity at my maximum and design the first idea that comes through my mind. For me, it’s like a good exercice to find new and original ways of exploiting these idea into real projects.',
      secondDesc:
        'These posters are the result of experiments with Illustrator, Photoshop, Lightroom and C4D. For the most part, i’m just looking new knowledges on the software and i’m experimenting it on the first though that comes to my mind. It leads to these abstract ideas but great ways to develop my skills on these softwares  and my creativity.',
      mainQuote: 'FREE YOUR MIND, <br> LEADS TO NEW IDEAS',
      secondQuote: 'NEW ABSTRACTS IDEAS, <br> NEW THINGS TO DESIGN',
      mainImg: require('~/static/images/projects/design3d/design3d-main.jpg'),
      othersImg: [
        require('~/static/images/projects/design3d/design3d-full.jpg'),
        require('~/static/images/projects/design3d/design3d-aside1.jpg'),
        require('~/static/images/projects/design3d/design3d-aside2.jpg')
      ]
    },
    {
      id: 'PORTFOLIOS',
      title: 'PORTFOLIOS',
      sliderTitle: ['PORTFOLIOS', 'PORTFOLIOS'],
      date: '2018',
      mainTech: 'VUEJS',
      othersTech: ['JS', 'UX', 'SELF-TAUGHT'],
      mainDesc:
        'Finding a good portfolio that reflect our own personality and own design is quite difficult. In order to make all these beautiessss, i had to design, sketch and iterate some thoughts before. I manage to learn some new technologies and libraries as well. Here is some examples of my old portfolios.',
      secondDesc:
        'I really love learning new things, obsseded by optimisation in my life and my work, i like to find new ways of ‘doing things’, new possibilities and new ‘open and undiscovered doors’. I like to go beyond my basic knowledge and be septic about each different point of view … I ended up this year on UDemy, a platform where you can basiclly find whatever courses you want and i chose to buy 20 hours of classes on ES6 JavaScript and 20 hours of classes on VueJS (Including Vuex and Vue-Router). Beside this, i choose to work with NuxtJS and PWA on this portfolio.',
      mainQuote: 'FOR ME ITERATING, <br> IS OFTEN THE KEY',
      secondQuote: 'I`M A SELF-TAUGHT PERSON, <br> EVERYTIME, EVERYWHERE !',
      mainImg: require('~/static/images/projects/portfolios/portfolios-main.jpg'),
      othersImg: [
        require('~/static/images/projects/portfolios/portfolios-full.jpg'),
        require('~/static/images/projects/portfolios/portfolios-aside1.jpg'),
        require('~/static/images/projects/portfolios/portfolios-aside2.jpg')
      ]
    }
  ]
});
