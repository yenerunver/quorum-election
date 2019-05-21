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
