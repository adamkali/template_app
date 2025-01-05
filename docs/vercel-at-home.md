# Vercel at Home.

This is from the the [Dreams of Code Youtube Channel](https://www.youtube.com/@dreamsofcode), it adds in the commands and steps from the second video so that the entire process should be in this markdown file. 😊 

If you have setup Arch without `archinstall` this would be braindead easy to do. If not, it may be daunting, but that is all it is. Daunting not hard.

Use this setup if you do not want to self host on a vps or on a homeserver. 

## 1. Create a New User with Sudo Permissions
```
# Log in as root
ssh root@your-server-ip

# Create a new user
adduser newuser

# Add the user to the sudo group
usermod -aG sudo newuser

# Test the new user
su - newuser
sudo apt update
```


## 2. Set Up SSH Key Authentication
First make sure that on the server that in `/etc/ssh/sshd_config` PasswordAuthentication is On!

```bash
sudo vim /etc/ssh/sshd_config
```

Modify the following in the file:
```
PasswordAuthentication yes  # Disable key based auth
```

Restart the ssh daemon.
```bash
sudo systemctl restart ssh
ssh newuser@your-server-ip
```

When i am able to login reliably, I can go ahead and do this on my local machine.  
```
ssh-keygen -t ed25519 -C "adam.kalilarosa@proton.me"
ssh-copy-id -i ~/.ssh/id_ed25519.pub newuser@your-server-ip
ssh newuser@your-server-ip
```

## 3. Harden SSH
Now make sure, to turn off PasswordAuthentication and PermitRootLogin in `/etc/ssh/ssh_config`
```bash
sudo vim /etc/ssh/sshd_config
```

These are the settings that need to be changed.
```
# Modify the following in the file:
# PasswordAuthentication no  # Disable key based auth
```

Restart the service 
```bash
sudo systemctl restart ssh
ssh newuser@your-server-ip
```

## 4. Set Up a Firewall (UFW)
```
# Install UFW if not already installed
sudo apt install ufw

# Allow necessary ports
sudo ufw allow OpenSSH    # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS

# Enable UFW
sudo ufw enable

# Check UFW status
sudo ufw status
```

## 5. (Optional) Install and Configure Fail2Ban

```
# Install Fail2Ban
sudo apt install fail2ban

# Create a local configuration file
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit Fail2Ban configuration for SSH
sudo nano /etc/fail2ban/jail.local
# Ensure the following lines are set:
# [sshd]
# enabled = true
# port = 22 # Change this if you've modified your SSH port.
# maxretry = 5
# bantime = 3600

# Restart Fail2Ban service
sudo systemctl restart fail2ban

# Check Fail2Ban status
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

## 6. Setup Docker Contexts 

```bash 
docker context create <new server app name> --docker "host:ssh://root@server.dns.name"
```

Test it out 
```bash 
docker context use <new serever app name>
docker ps
should be nothing here.
```

## 7. Setup Docker swarm
In that context, make a docker swarm 
```bash
docker swarm init
```

And then when you can, deploy your app to the server, 
```bash 
docker stack deploy -c <compose.yml> <stack-name> 
```

## 8. Setup secrets! 
we will use `docker secrets` command

we will first create the secret by doing the following 
```bash
printf "<secret>" | docker secret create <secret-name>
```

### Example docker-compose file using the `docker secret`.
```yml 
services:
  db:
    image: postgres
    user: postgres
    volumes:
      - db-data:/var/lib/postgresql/data
    secrets:
      - db-password
    environment:
      - POSTGRES_DB=app
      - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
    healthcheck:
      test: [ "CMD", "pg_isready" ]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  db-data:

secrets:
  db-password:
    external: true

```

## 9. Setup Deploy on master!
Add the following to your github workflow pipeline: 
```yml 
  deploy:
    runs-on: ubuntu-latest
    needs:
      - build-and-push-image
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: create env file
      run: |
        echo "GIT_COMMIT_HASH=${{ github.sha }}" >> ./envfile

    - name: Docker Stack Deploy
      uses: cssnr/stack-deploy-action@v1
      with:
        name: zenfulstats
        file: docker-stack.yaml
        host: server.dns.name
        user: deploy
        ssh_key: ${{ secrets.DEPLOY_SSH_PRIVATE_KEY }}
        env_file: ./envfile
```

## 10. Add a user for Github actions on the vps/home server
In sudo, add a user for deployment
```bash 
adduser deploy
# add them to the docker group
usermod -aG docker deploy
```
Now you shouldu be able to do: 
```bash
su - deploy
docker ps
```

If you do not see anything here, you will need to re do this 


## 11. Add an ssh key pair to the authorized_keys 
create another ssh-key pair as done above.
this will be refered to as the #### for now one.

```bash 
su - deploy 
mkdir .ssh 
echo '"docker system dial-stdio" ssh-ed25519 #### deploy@server.dns.name
```

## 12. Add the ssh secret to the Github Repository
- Go to the `Settings` tab of the of your Github Repository. 
- On the sidebar scroll down to **Secrets and Variables**
- Click on the dropdown and click the **Actions** 
- Clck **New Repository Secret** 
- in the secret name type: `DEPLOY_SSH_PRIVATE_KEY`
- and in the value type: `ssh-ed25519 #### deploy@server.dns.name`

