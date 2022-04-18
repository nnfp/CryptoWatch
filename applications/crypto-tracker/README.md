This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## https://github.com/CSC-648-SFSU/csc648-spring22-04-team04

    1. clone this ^ repository from master
    2. $ git fetch
    3. $ cd applications/crypto-tracker
    4. request file .env.local from teammember! 
        * once this is complete, add .env.local to /crypto-tracker
    5. $ yarn
    6. $ yarn run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.




## Starting server if not on already
Instructions:

	1.)	 cd into /setup
			$ ls 
				to make sure that "thenewestkey.cer" is there. 
			$  chmod 400 thenewestkey.cer
			$  ssh -i "thenewestkey.cer" ec2-user@ec2-3-83-190-71.compute-1.amazonaws.com

	2.) 
		$ sudo su
		$ sudo systemctl stop nginx
		$ sudo systemctl start nginx
		$ sudo systemctl status nginx
			
	
* if need to restart server *
		sudo systemctl restart nginx

			confirm that the server is running.

	3.) Run some shell commands in the following order. 

		

		$   cd /
		$   cd var/www/html/applications/crypto-tracker
		$   yarn
		$   yarn next build
		$   pm2 start npm --name "crypto-tracker" -- start
	


 	*** if steps above worked properly **



 	4.)  enter url in browser --> ec2-3-83-190-71.compute-1.amazonaws.com/about





## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


