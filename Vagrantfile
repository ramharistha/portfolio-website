Vagrant.configure("2") do |config|

  config.vm.box = "bento/ubuntu-22.04"
  config.vm.hostname = "CRUD-VM"
   # configure vagrant to use vmware workstation pro
  config.vm.provider "vmware_desktop" do |v|
    v.vmx["memsize"] = "2048"
    v.vmx["numvcpus"] = "2"
    v.gui = true
    v.vmx["displayName"] = "CRUD"
    # v.gui enables vmware to use it in gui form
  end
  # Port forwarding for Node app / Jenkins
<<<<<<< HEAD
  config.vm.network "forwarded_port", guest: 3000, host: 3000
=======
  config.vm.network "forwarded_port", guest: 3000, host: 3001
>>>>>>> b9a12c6fb2d710c2bd9954f030fc3ff89adbe952
  config.vm.network "forwarded_port", guest: 8080, host: 8080

  config.vm.provision "shell", inline: <<-SHELL

    # Update system
    apt update -y

    # Install basics
    apt install -y curl git

    # Install Node.js (modern version)
    curl -fsSL https://deb.nodesource.com/setup_24.x | sudo bash -
    apt install -y nodejs

<<<<<<< HEAD
   
=======
   curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
      gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

    echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | \
      tee /etc/apt/sources.list.d/mongodb-org-7.0.list

    apt-get update
    apt-get install -y mongodb-org mongodb-mongosh

    systemctl enable mongod
    systemctl start mongod
>>>>>>> b9a12c6fb2d710c2bd9954f030fc3ff89adbe952
    # Install Docker 
    curl -fsSL https://get.docker.com | sh

    # Enable Docker service
    systemctl enable docker
    systemctl start docker

    # Add vagrant user to docker group
    usermod -aG docker vagrant

    # Install Docker Compose )
    apt install -y docker-compose-plugin
    # Run Jenkins container
    docker run -d   --name jenkins   -p 8080:8080   -p 50000:50000   -v jenkins_home:/var/jenkins_home   -v /var/run/docker.sock:/var/run/docker.sock   -v /usr/bin/docker:/usr/bin/docker   jenkins/jenkins:lts

     # Fix permission
<<<<<<< HEAD
=======
    sudo usermod -aG docker jenkins
>>>>>>> b9a12c6fb2d710c2bd9954f030fc3ff89adbe952
    sudo chmod 666 /var/run/docker.sock


  SHELL
end