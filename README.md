# otel-kubernetes


## Docker 
### build and run
```
version=1.01
docker build -t muzammil360/otel-kubernetes:${version} . \
&& docker push muzammil360/otel-kubernetes:${version}
 
docker run -p 3000:3000 -d muzammil360/otel-kubernetes:1.01

curl http://127.0.0.1:3000/ping # test that docker is working

```
### push
```
docker login -u muzammil360 --password-stdin
docker push muzammil360/otel-kubernetes:1.0
```


# Deploying kubernetes
After installing docker and minikube, run following 

```
cd kubernetes
minikube start 

kubectl apply -f webapp.yaml
kubectl apply -f otel.yaml

curl http://$(minikube ip):30100/ping # verify that app is up and running


```

### delete all resources
`minikube delete --all`
### stop the kubernetes
`minikube stop`
