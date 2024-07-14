let ballsClicked = 0;
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.hidden');
    console.log(elements)

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrollIn');
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });

    // Handle click events on moving objects
    const movingObjects = document.querySelectorAll('.moving-object');
    movingObjects.forEach(object => {
        // Set random initial position
        let section = document.getElementById("ballContainer");
        object.style.top = Math.random() * (section.clientHeight - 50) + 'px';
        object.style.left = Math.random() * (section.clientWidth - 50) + 'px';

        // Set random velocity
        let velocityX = (Math.random() - 0.5) * 2; // Random velocity between -1 and 1
        let velocityY = (Math.random() - 0.5) * 2; // Random velocity between -1 and 1

        object.addEventListener('click', clickEventFunction);

        function clickEventFunction(e) {
            console.log(e);
            // alert('You clicked on a moving object!');
            velocityX = (Math.random() - 0.5) * 2 * velocityX + 1; // Random velocity between -1 and 1
            velocityY = (Math.random() - 0.5) * 2 * velocityY + 1; // Random velocity between -1 and 1

            e.target.classList.add('hidden');
            setTimeout(() => {
                e.target.classList.remove('hidden');
            }, 1000);
            document.getElementById("ballsClicked").textContent = `Balls Clicked: ${++ballsClicked}`

            if(ballsClicked > 9 && ballsClicked < 30){
                let newObject = document.createElement('div');
                newObject.className = "moving-object";
                newObject.id = "object1";

                newObject.style.top = Math.random() * (section.clientHeight - 50) + 'px';
                newObject.style.left = Math.random() * (section.clientWidth - 50) + 'px';

                let newObjVelocityX = (Math.random() - 0.5) * 2; // Random velocity between -1 and 1
                let newObjVelocityY = (Math.random() - 0.5) * 2; // Random velocity between -1 and 1

                document.getElementById("movingBalls").appendChild(newObject);

                // Animate the object
                function moveNewObject() {
                    const rect = newObject.getBoundingClientRect();
                    const sectionRect = section.getBoundingClientRect();

                    let newX = rect.left + newObjVelocityX;
                    let newY = rect.top + newObjVelocityY;

                    newX -= sectionRect.left;
                    newY -= sectionRect.top;

                    // Bounce off the walls
                    if (newX <= 0 || newX >= section.clientWidth - rect.width) {
                        newObjVelocityX *= -1;
                    }
                    if (newY <= 0 || newY >= section.clientHeight - rect.height) {
                        newObjVelocityY *= -1;
                    }

                    newX = Math.max(0, Math.min(section.clientWidth - rect.width, newX));
                    newY = Math.max(0, Math.min(section.clientHeight - rect.height, newY));

                    newObject.style.left = newX + 'px';
                    newObject.style.top = newY + 'px';

                    requestAnimationFrame(moveNewObject);
                }
                moveNewObject();

                newObject.addEventListener('click', clickEventFunction);
            }

            if(ballsClicked > 29){
                let movingBalls = document.getElementById("movingBalls");
                let children = movingBalls.childNodes;
                for(let child of children){
                    movingBalls.removeChild(child);
                }
            }
        }

        // Animate the object
        function moveObject() {
            const rect = object.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();

            let newX = rect.left + velocityX;
            let newY = rect.top + velocityY;

            newX -= sectionRect.left;
            newY -= sectionRect.top;

            // Bounce off the walls
            if (newX <= 0 || newX >= section.clientWidth - rect.width) {
            velocityX *= -1;
        }
        if (newY <= 0 || newY >= section.clientHeight - rect.height) {
            velocityY *= -1;
        }

        newX = Math.max(0, Math.min(section.clientWidth - rect.width, newX));
        newY = Math.max(0, Math.min(section.clientHeight - rect.height, newY));

        object.style.left = newX + 'px';
        object.style.top = newY + 'px';

        requestAnimationFrame(moveObject);
    }

    moveObject();

    });
});