# languageService

Prerequisites
    things you need to install the software and how to install them
        -install node.js
            1. download .exe file and install it
            2. edit path of system variable to include node
            
        -install mogodb 
            1. download .exe file and install it
            2. edit path of system variable to include mongo
            3. make sure that data folder created on c drive and inside it there is a folder with name db which will contain databases
            


Installing
    1. to make sure that node installed correctly please open cmd and run node command expected not to have issue
    2. to make sure that mongo installed correctly please open cmd and run mongod, open anoter cmd and run mongo. expected to run without        issue
    

Runnint the App
    1. open cmd, enter mongod command
    2. open another cmd, enter mongo command
    3. open cmd and navigate to project folder path and enter nodemon server.js command 
    4. it expected to display this message at the end 'Language service is ruuning on port 3000'
    Now the server is ready
    
Running the tests
    1. open cmd, enter mongod command
    2. open another cmd, enter mongo command
    3. open cmd and navigate to project folder path and enter mocha
    4. it expected to run test cases and display that it is running successfully


About Test cases
    test caese are written inside testCases.js inside folder test
    this file inclue rest apis that written in server.js for crud operations on language, lesson and example


Authors
Menna Ramadan