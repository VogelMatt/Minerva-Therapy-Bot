import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";

const ChatInterface = () => {
	const [messages, setMessages] = useState([]);
	const [inputText, setInputText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputText.trim() || isLoading) return;

		const userMessage = {
			role: "user",
			content: inputText.trim(),
			timestamp: new Date().toISOString(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputText("");
		setIsLoading(true);

		// Simulate response for now
		setTimeout(() => {
			const mockResponse = {
				role: "assistant",
				content: "Thank you for sharing. How does that make you feel?",
				timestamp: new Date().toISOString(),
			};

			setMessages((prev) => [...prev, mockResponse]);
			setIsLoading(false);
		}, 1000);
	};

	return (
		<Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col bg-white shadow-lg">
			<CardHeader className="border-b bg-gray-50">
				<CardTitle className="text-lg font-semibold text-gray-700">
					Minerva Therapy
				</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 overflow-auto p-4 space-y-4">
				{messages.length === 0 ? (
					<div className="h-full flex items-center justify-center text-gray-500">
						<MessageCircle className="mr-2 h-6 w-6" />
						<span className="text-lg">How are you feeling today? boop boop this is working </span>
					</div>
				) : (
					<>
						{messages.map((message, index) => (
							<div
								key={index}
								className={`flex ${
									message.role === "user" ? "justify-end" : "justify-start"
								}`}
							>
								<div
									className={`max-w-[80%] rounded-lg p-3 ${
										message.role === "user"
											? "bg-blue-500 text-white"
											: "bg-gray-100 text-gray-900"
									}`}
								>
									{message.content}
								</div>
							</div>
						))}
						<div ref={messagesEndRef} />
					</>
				)}
			</CardContent>

			<div className="p-4 border-t bg-white">
				<form onSubmit={handleSubmit} className="flex gap-2">
					<Input
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						placeholder="Type your message..."
						className="flex-1"
						disabled={isLoading}
					/>
					<Button
						type="submit"
						disabled={!inputText.trim() || isLoading}
						className="bg-blue-500 hover:bg-blue-600 text-white"
					>
						<Send className="h-4 w-4" />
					</Button>
				</form>
			</div>
		</Card>
	);
};

export default ChatInterface;
