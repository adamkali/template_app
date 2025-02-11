import {
	createContext,
	JSX,
} from "solid-js";
import * as Minio from "minio";

const MinioContext = createContext(new Minio.Client({ endPoint: "", }));

const MinioProvider = (props: {
	children: JSX.Element;
}) => (
	<MinioContext.Provider
		value={
			new Minio.Client({
				endPoint: import.meta.env.MINIO_URI,
				port: 443,
				useSSL: true,
				accessKey: import.meta.env.MINIO_ACCESS_KEY,
				secretKey: import.meta.env.MINIO_SECRET_KEY,
			})
		}
	>
		{props.children}
	</MinioContext.Provider>
);

export default  MinioProvider;
