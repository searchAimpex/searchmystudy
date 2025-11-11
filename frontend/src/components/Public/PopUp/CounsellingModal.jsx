import React from "react";
import PopUpWomen from "../../../assets/PopUpWomen.png";

export default function CounsellingModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px] relative flex">
                <div className="w-full">
                    <div className="text-2xl flex flex-row space-x-2  font-bold mb-2">
                       <span className="text-blue-main">Get</span>
                       <span className="text-gold-main">Counselling</span>
                    </div>
                    <p className="text-gray-600 mb-4">We are here to help you. Fill out the form to get started.</p>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                            <textarea
                                placeholder="How can we help you?"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="bg-gray-200 px-4 py-2 rounded-lg"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-main text-white px-4 py-2 rounded-lg">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
             
            </div>
        </div>
    );
}
