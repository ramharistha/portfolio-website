pipeline {
    agent any

    environment {
        MONGO_URI = credentials('MONGO_URI')
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'master',
                    credentialsId: 'crud',
                    url: 'https://github.com/codieSam/crud-app.git'
            }
        }

        stage('Workspace Check') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Verify App Files') {
            steps {
                sh 'test -f Dockerfile'
                sh 'test -f app.js'
                sh 'test -f Jenkinsfile'
                sh 'echo "Required files found"'
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

        stage('CI Status') {
            steps {
                echo 'Repository fetched successfully and CI pipeline executed.'
            }
        }
    }
}