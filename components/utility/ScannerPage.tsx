import { useState } from 'react';
import ScanBarcode from './Scanner';

const ScannerPage: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button
				className="hover:text-primary dark:hover:text-secondary"
				onClick={() => setShowModal(true)}
				data-testid="scanner-title"
			>
				Scanner
      </button>
			{showModal ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					>
						<div className="relative w-full my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
									<h3
										className="text-3xl font-semibold"
										data-testid="scanner-title"
									>
										Scan Product
                  </h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									></button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									<div>
										<video
											id="video"
											width="800"
											height="600"
											style={{
												border: "1px solid gray",
											}}
											data-testid="video-elm"
										></video>
										<ScanBarcode />
									</div>
								</div>
								{/*footer*/}
								<div className="flex items-center space-x-3 justify-end p-6 border-t border-solid border-gray-300 rounded-b">
									<button
										className="colorful-button"
										type="button"
										style={{
											transition: "all .15s ease",
											backgroundColor: "#EF4444",
											borderColor: "#EF4444",
										}}
										onClick={() => setShowModal(false)}
										data-testid="close-button"
									>
										Close
                  </button>
									<button
										className="colorful-button"
										type="button"
										style={{ transition: "all .15s ease" }}
										onClick={() => setShowModal(false)}
									>
										Send
                  </button>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="opacity-50 fixed inset-0 z-40 bg-black"></div> */}
				</>
			) : null}
		</>
	);
};

export default ScannerPage;