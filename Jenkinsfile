pipeline {
    agent any

    environment {
        MONGO_URI = credentials('MONGO_URI')
    }

    stages {

        stage('Clone Repo') {
            steps {
<<<<<<< HEAD
                git branch: 'feature/devops-ci',
                   // credentialsId: 'crud',
                    url: 'https://github.com/ramharistha/portfolio-website.git'

            }
        }
        
=======
                git branch: 'master',
                    url: 'https://github.com/ramharistha/portfolio-website.git'
            }
        }
>>>>>>> b9a12c6fb2d710c2bd9954f030fc3ff89adbe952

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