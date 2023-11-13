# otel-kubernetes


## Docker 

```
cd app
docker build -t muzammil360/otel-kubernetes/app:1.0 .
docker push muzammil360/otel-kubernetes/app:1.0
docker run -p 3000:3000 -d muzammil360/otel-kubernetes/app:1.0

curl http://127.0.0.1:3000/ping # test that docker is working

```

# Deploying kubernetes
After installing docker and minikube, run following 

```
cd kubernetes
minikube start 

kubectl apply -f webapp.yaml

minikube ip # get the node ip 

curl http://192.168.49.2:30100/ping


```

### delete all resources
`minikube delete --all`
### stop the kubernetes
`minikube stop`
