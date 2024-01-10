import { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/service";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await signUp(req.body, (status) => {
            if (status) {
                res.status(200).json({ status: true, message: 'Successfully registered' });
            } else {
                res.status(200).json({ status: false, message: 'User already exists' });
            }
        });
    } else {
        res.status(405).json({ status: false, message: 'Method not allowed' });
    }
}
