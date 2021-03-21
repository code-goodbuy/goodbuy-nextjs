import React, { useState, useEffect, useRef } from "react";
import {
	BrowserMultiFormatOneDReader,
	IScannerControls
} from "@zxing/browser";

// 1d barcode scanner init
const getQRCodeReaderControls = async (selectedDeviceId: string) => {
	const codeReader = new BrowserMultiFormatOneDReader();
	const previewElem = document.querySelector("video");
	const videoElem = previewElem as HTMLVideoElement;

	const BASE_URL = "https://18.197.135.126";

	// Use decodeFromConstrains() if switchTorch() necessary

	const controls = await codeReader.decodeFromVideoDevice(
		selectedDeviceId,
		videoElem,
		(result, error, controls) => {
			// use the result and error values to choose your actions
			// you can also use controls API in this scope like the controls
			// returned from the method.
			// console.log("---- result: ", result);
			// console.log("---- error: ", error);
			// console.log("---- controls: ", controls);

			if (result) {
				// FIXME parsing result object gone wrong
				// @ts-ignore
				const scanResult = JSON.parse(result);
				alert(scanResult);
				console.log(controls);
				console.log(result.getBarcodeFormat);


				// TODO connect to api server later

				// async function postBarcode(url = '', data: String) {
				// 	const response = await fetch(url, {
				// 		method: 'POST',
				// 		mode: 'cors',
				// 		cache: 'no-cache',
				// 		credentials: 'same-origin',
				// 		headers: {
				// 			'Content-Type': 'application/json'
				// 		},
				// 		referrerPolicy: 'no-referrer',
				// 		body: JSON.stringify(data)
				// 	});
				// 	return response.json();
				// }
				// postBarcode(BASE_URL + "/post-barcode", scanResult)
				// 	.then(data => { console.log(data) })
				// 	.catch(error => { console.log(error) })

				fetch(BASE_URL + "/barcode-number", {
					method: "POST",
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'same-origin',
					headers: { "Content-Type": "application/json" },
					referrerPolicy: 'no-referrer',
					body: JSON.stringify(scanResult)
				})
					.then((res) => res.json())
					.then((res) => { console.log(res) })
					.catch(error => { console.log(error) });
			}
		}
	);

	// FIXME force camera stop after 30s 
	setTimeout(() => controls.stop(), 30000);

	return controls;
};

type Device = {
	deviceId: string;
	label: string;
};

const ScanBarcode: React.FC = () => {
	const controlsRef = useRef<IScannerControls | null>(null);
	const [selectedDeviceId, setSelectedDeviceId] = useState("");
	const [devices, setDevices] = useState<Array<Device>>([]);


	useEffect(() => {
		const getDevices = async () => {
			// mobile device can't be enumerated, method not support
			const videoInputDevices = await BrowserMultiFormatOneDReader.listVideoInputDevices();

			// choose your media device (webcam, frontal camera, back camera, etc.)
			const selectedDeviceId = videoInputDevices[0].deviceId;

			console.log(`Started decode from camera with id ${selectedDeviceId}`);

			setDevices(videoInputDevices);
			setSelectedDeviceId(selectedDeviceId);
		};

		getDevices();
	}, []);

	return (
		<div>
			<div id="sourceSelectPanel">
				<br />
				<label htmlFor="sourceSelect">Select the camera:</label>
				<select
					id="sourceSelect"
					value={selectedDeviceId}
					onChange={(event) => setSelectedDeviceId(event.target.value)}
				>
					{devices.map(({ deviceId, label }) => (
						<option key={deviceId} value={deviceId}>
							{label}
						</option>
					))}
				</select>
				<br></br>
          (if you change the selected camera, please click again the Start button)
        </div>
			<br />
			<div className="space-x-3">
				<button
					className="colorful-button"
					onClick={async () => {
						controlsRef.current = await getQRCodeReaderControls(selectedDeviceId);
					}}
				>
					Start
        </button>{" "}
				<button
					className="colorful-button"
					onClick={() => {
						controlsRef.current?.stop();
					}}
				>
					Stop
        </button>
			</div>
		</div>
	);
};

const ScannerPage: React.FC = () => {
	const [showModal, setShowModal] = React.useState(false);
	return (
		<>
			<a
				type="button"
				style={{ transition: "all .15s ease", cursor: "pointer" }}
				onClick={() => setShowModal(true)}
			>
				Scanner
            </a>
			{showModal ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					// onClick={() => setShowModal(false)}
					>
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
									<h3 className="text-3xl font-semibold">
										Scanner
                    </h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
									</button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									<div>
										<video
											id="video"
											width="600"
											height="400"
											style={{ border: "1px solid gray" }}
										></video>
										<ScanBarcode />
									</div>
								</div>
								{/*footer*/}
								<div className="flex items-center space-x-3 justify-end p-6 border-t border-solid border-gray-300 rounded-b">
									<button
										className="colorful-button"
										type="button"
										style={{ transition: "all .15s ease", backgroundColor: "#EF4444", borderColor: "#EF4444" }}
										onClick={() => setShowModal(false)}
									>
										Close
                    </button>
									<button
										className="colorful-button"
										type="button"
										style={{ transition: "all .15s ease" }}
										onClick={() => setShowModal(false)}
									>
										Send Barcode Number
                    </button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
};

export default ScannerPage;