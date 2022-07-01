# ditchthestick

Ditch the stick is a working title for a web project that was developed using AWS services, JS, HTML, CSS and Plotly.js. 

Link for live demo - https://dv9maudrfv9zw.cloudfront.net/

First feature is a live counter of time passed since last cigarette. The counter can be stopped and resumed on click returning time difference between now and selected date & time. Built using Moment.js library.

![main](https://user-images.githubusercontent.com/60256130/176883066-6c49568c-61e4-45ba-ade3-156d631eb4a0.PNG)

Based on the result time passed - smoke free now, the next section maps to currently passed milestones.

![mlstns](https://user-images.githubusercontent.com/60256130/176883760-925f1e7f-c868-44fa-af4c-506e94e30b64.PNG)

Each item can be clicked and will scroll into it's respective slide in carousel below which shows detailed description of the given milestone. Built using Splide.js library.

![detail](https://user-images.githubusercontent.com/60256130/176884725-f3ab8be4-6ce9-41a3-9153-167d83255e1f.PNG)

Motivation section is built using CSS animations for initial image load and random image generated based on click on the next button.

![motivation](https://user-images.githubusercontent.com/60256130/176885977-6d89fddc-38a8-4fc2-87aa-87aed938e481.PNG)

Final section of the page is called Data & Statistics and has 3 main functionalities: 
1. Form - form consists of multiple questions and inputs both smoking related and general demographic information. Form is submitted to an API which triggers a AWS lambda function which writes the input into a file and outputs input data for charts that will be drawn.
2. Statistics - hits the same API as for form submit but only calculates the chart input data which is sent in the response
3. Download dataset - triggers API -> lambda function which generates a presigned url of the S3 object and is sent as a response -> on successful response page is redirected to the received presignedurl and that triggers the download of the file.

Form

![data](https://user-images.githubusercontent.com/60256130/176888333-ac43c465-7f0d-489d-8834-3af3666e7097.PNG)

Statistics

![stats1](https://user-images.githubusercontent.com/60256130/176888534-ece2d0ec-3fc2-4151-acea-fd406748d18b.PNG)
![stats2](https://user-images.githubusercontent.com/60256130/176888542-1053238c-37b0-45b0-abb9-2062b23c6629.PNG)

