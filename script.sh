# #!/bin/bash
# cd ./Backend/
# npm install
# cd ../Socket/
# npm install
# cd ../Frontend/
# npm install --legacy-peer-deps
# cd ../
# npm install

#!/bin/bash

# Define your load balancer name
LOAD_BALANCER_NAME="your-load-balancer-name"

# Get instance IDs associated with the load balancer
INSTANCE_IDS=$(aws elb describe-load-balancers --load-balancer-name $LOAD_BALANCER_NAME --query 'LoadBalancerDescriptions[*].Instances[*].InstanceId' --output text)

# Iterate over each instance and terminate them
for INSTANCE_ID in $INSTANCE_IDS; do
    echo "Terminating instance: $INSTANCE_ID"
    # Terminate the instance
    aws ec2 terminate-instances --instance-ids $INSTANCE_ID

    # Wait until the instance is fully terminated
    echo "Waiting for termination of instance: $INSTANCE_ID"
    aws ec2 wait instance-terminated --instance-ids $INSTANCE_ID
    echo "Instance terminated: $INSTANCE_ID"
done

echo "All instances associated with the load balancer have been terminated."

