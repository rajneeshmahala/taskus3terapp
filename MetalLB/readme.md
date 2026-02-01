Perfect 👍
Since you’re running single-node Kubernetes (k3s) on Ubuntu 22.04 in an Azure VM, MetalLB is the right choice to get LoadBalancer services working for learning and demos.

Below is a clear ZERO → WORKING guide, optimized for k3s + single node.

⸻

What MetalLB Does (Quick)

By default, on-prem / self-managed clusters don’t have a cloud load balancer.
MetalLB:
	•	Assigns an external IP from a pool you define
	•	Makes Service type: LoadBalancer work

------==============----------------=================------------============--------------================-----

Below is the same complete guide in PURE PLAIN TEXT
(no images, no emojis, no formatting tricks)

⸻

METALLB SETUP ON SINGLE NODE K3S (UBUNTU 22.04 – AZURE VM)

⸻

ENVIRONMENT
	•	Azure VM
	•	Ubuntu 22.04
	•	Single node Kubernetes using k3s
	•	Goal: Enable Service type LoadBalancer using MetalLB

⸻

STEP 0 – VERIFY CLUSTER

Run:
kubectl get nodes

Expected:
STATUS = Ready
ROLES = control-plane

Check version:
kubectl version –short

⸻

STEP 1 – DISABLE K3S BUILT-IN SERVICE LOAD BALANCER

k3s includes klipper-lb (servicelb) which must be disabled.

Check if running:
kubectl get pods -n kube-system | grep svclb

If pods exist, disable servicelb.

Edit k3s service:
sudo nano /etc/systemd/system/k3s.service

Find:
ExecStart=/usr/local/bin/k3s server

Change to:
ExecStart=/usr/local/bin/k3s server –disable servicelb

Reload and restart:
sudo systemctl daemon-reexec
sudo systemctl restart k3s

Verify:
kubectl get pods -n kube-system | grep svclb

No output means servicelb is disabled.

⸻

STEP 2 – IDENTIFY NETWORK AND CHOOSE IP RANGE

Check VM private IP:
ip a

Example:
eth0: 10.0.0.4/24

Subnet is:
10.0.0.0/24

Choose unused IP range in SAME subnet.
Example:
10.0.0.240 – 10.0.0.250

Rules:
	•	Must be in same subnet
	•	Must not be used by Azure
	•	Must be private IPs

⸻

STEP 3 – INSTALL METALLB

Apply MetalLB manifests:
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.14.5/config/manifests/metallb-native.yaml

Wait for pods:
kubectl get pods -n metallb-system

Expected:
controller = Running
speaker = Running

⸻

STEP 4 – CREATE IP ADDRESS POOL

Create file:
nano metallb-ip-pool.yaml

Paste (CHANGE IP RANGE IF NEEDED):

apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
name: azure-pool
namespace: metallb-system
spec:
addresses:
	•	10.0.0.240-10.0.0.250

Apply:
kubectl apply -f metallb-ip-pool.yaml

⸻

STEP 5 – ENABLE LAYER 2 ADVERTISEMENT

Create file:
nano metallb-l2.yaml

Paste:

apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
name: l2
namespace: metallb-system
spec:
ipAddressPools:
	•	azure-pool

Apply:
kubectl apply -f metallb-l2.yaml

⸻

STEP 6 – DEPLOY TEST APPLICATION (NGINX)

Create deployment:
kubectl create deployment nginx –image=nginx

Expose service as LoadBalancer:
kubectl expose deployment nginx –port=80 –type=LoadBalancer

⸻

STEP 7 – VERIFY LOAD BALANCER IP

Run:
kubectl get svc

Expected output:
nginx   LoadBalancer   CLUSTER-IP   EXTERNAL-IP   80:PORT/TCP

Example:
EXTERNAL-IP = 10.0.0.240

⸻

STEP 8 – TEST ACCESS

From VM:
curl http://10.0.0.240

You should see:
Welcome to nginx!

From browser (same VNet or VPN):
http://10.0.0.240

⸻

IMPORTANT NOTES
	1.	MetalLB assigns PRIVATE IP only
	2.	It will NOT expose service to internet automatically
	3.	For internet access:
	•	Use Azure Load Balancer
	•	Or Azure Public IP with NAT
	•	Or Ingress Controller with Azure LB

⸻

TROUBLESHOOTING

External IP shows 
	•	Check MetalLB pods are running
	•	Verify IP range is correct subnet
	•	Ensure servicelb is disabled

Service not reachable
	•	Check Azure NSG allows traffic
	•	Test from same VNet first

⸻

WHAT YOU LEARNED
	•	How MetalLB works in on-prem / VM clusters
	•	Difference between NodePort and LoadBalancer
	•	Real-world networking constraints
	•	Why cloud providers give LB automatically

⸻ 

NEXT LEARNING STEPS (RECOMMENDED)
	1.	Install Ingress NGINX on MetalLB
	2.	TLS with cert-manager
	3.	NodePort vs LoadBalancer vs Ingress
	4.	BGP mode MetalLB (production)
	5.	Azure Load Balancer vs MetalLB comparison

⸻

If you want:
	•	Ingress setup in same plain text
	•	Interview explanation version
	•	Cleanup and reinstall script
	•	Production design for Azure
