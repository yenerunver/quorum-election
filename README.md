# Blockchain-based e-Voting System for Turkish National Elections
Sample election system for Turkey with private transactions using Quorum

## Versions Used
```
nodejs   => v8.10.0
npm      => v3.5.2
vagrant  => v2.0.2
truffle  => v5.0.18
solidity => v0.5.0
web3.js  => v1.0.0-beta.37
```

## Quorum
This project is built with Vagrant on a virtual private server using a Quorum network and developing an application by modifying Quorum’s 7Nodes example which consists 7 nodes and 7 transaction managers.

In your server, open a terminal and clone the 7Nodes example:

```
git clone https://github.com/jpmorganchase/quorum-examples
```

After clonning process is completed, enter the directory and start Vagrant deployment:

```
cd quorum-examples
vagrant up
```

After vagrant up successfully completes, access the newly minted virtual machine:

```
vagrant ssh
```

You will see a change in command line, run below code:

```
vagrant@ubuntu-xenial:~$ cd quorum-examples/7nodes/
```

Now create seven Quorum nodes to simulate a real Quorum deployment and start up those nodes. Before that, add `--rpccorsdomain http://localhost:80` to raft-start.sh:77 to access nodes from a UI.

```
./raft-init.sh
./raft-start.sh constellation
```

Our environment is ready. Next thing is to deploy our Truffle application and UI.

## UI

Open up a new terminal and run this code in your workspace:

```
git clone https://github.com/yenerunver/quorum-election
```

Smart Contract and Truffle configuration files are already included in this project. Just need to migrate:

```
truffle migrate
```

The project is ready.
