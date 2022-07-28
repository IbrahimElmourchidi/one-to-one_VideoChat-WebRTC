# This guid is for install jitsi meet server on ubuntu 20 and activate the jwt authentication

## _step 1_:

- install the needed packages

  ```console
      sudo apt update
      sudo apt install gnupg2
      sudo apt install nginx-full
      sudo apt update
      sudo apt install apt-transport-https
      sudo apt-add-repository universe
  ```

# _step2_:

- change the host name of the machine to be your domain name

```console
    sudo hostnamectl set-hostname <your domain name>
```

- open /etc/hosts & add the following line

```
x.x.x.x <your domain name>
```

**x.x.x.x is your public ip address**

- check if host name is configured ok, in the terminal type

```console
  ping "$(hostname)"
```

**you should see ping to your domain name**

# _step3_:

- Add the Prosody package repository

```console
echo deb http://packages.prosody.im/debian $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list
wget https://prosody.im/files/prosody-debian-packages.key -O- | sudo apt-key add -
```

- Add the Jitsi package repository

```console
curl https://download.jitsi.org/jitsi-key.gpg.key | sudo sh -c 'gpg --dearmor > /usr/share/keyrings/jitsi-keyring.gpg'

echo 'deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/' | sudo tee /etc/apt/sources.list.d/jitsi-stable.list > /dev/null

sudo apt update

```

# _step4_:

- Setup and configure your firewall

```console
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 10000/udp
sudo ufw allow 22/tcp
sudo ufw allow 3478/udp
sudo ufw allow 5349/tcp
sudo ufw enable
```

**note**: if you are using azure you need to add inbound role to the vm through azure portal.

- Check the firewall status with:

```console
sudo ufw status verbose
```

# _step5_:

- jitsi-meet installation

```console
sudo apt install jitsi-meet
```

# _step6_:

### **very important note to generate TLS certificate from let's encrypt you need to have domain name , you cannot simply just use the public ip**

- generate TLS Certificate

```console
sudo /usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh
```
