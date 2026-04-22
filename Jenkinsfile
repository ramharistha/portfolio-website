pipeline {
    agent any

    environment {
        MONGO_URI = credentials('MONGO_URI')
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/ramharistha/portfolio-website.git'
            }
        }

        stage('Build & Deploy') {
    steps {
        sh '''
        docker build -t crud-app .

        docker rm -f crud-app-container || true

        docker run -d \
            --name crud-app-container \
            -p 3000:3000 \
            -e MONGO_URI=$MONGO_URI \
            crud-app
        '''
    }
}
    }
}