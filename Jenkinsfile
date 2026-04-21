pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master',
                    
                    url: 'https://github.com/ramharistha/portfolio-website.git'
            }
        }

 

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t crud-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker rm -f crud-app-container || true'
                sh 'docker run -d --name crud-app-container -p 3000:3000 crud-app'
            }
        }
    }
}