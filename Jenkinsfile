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
                docker compose down || true

                MONGO_URI=$MONGO_URI docker compose up -d --build
                '''
            }
        }
    }
}