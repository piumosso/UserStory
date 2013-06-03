1. Configure

    UserStory.config({
        enable: true,
        on: 'a',
        off: ['a.c', 'a.x']
    })

2. Parse

    user-story parse {input} {output}
    // Tra-ta ta-ta @a.b
    UserStory.log('Tra-ta ta-ta', 'a.b');

3. Log

    console.log('a.b:', 'Tra-ta ta-ta');
