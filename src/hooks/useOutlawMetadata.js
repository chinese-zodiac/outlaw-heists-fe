import useStore from "../store/useStore";

export function useOutlawMetadataMulti(nftIds) {
    const fetchOutlawMetadata = useStore((state) => state.fetchOutlawMetadata);
    nftIds?.forEach((nftId) => fetchOutlawMetadata(nftId));

    const outlawMetadata = useStore((state) => state.outlawMetadata.filter((val) => nftIds?.includes(val?.nftId)));
    return {
        metadataMulti: outlawMetadata
    }
}

export default function useOutlawMetadata(nftId) {
    const fetchOutlawMetadata = useStore((state) => state.fetchOutlawMetadata);
    fetchOutlawMetadata(nftId);

    const outlawMetadata = useStore((state) => state.outlawMetadata[nftId]);

    return { metadata: outlawMetadata }
}