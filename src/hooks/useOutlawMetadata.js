import useStore from "../store/useStore";

export function useOutlawMetadataMulti(nftIds) {
    const fetchOutlawMetadata = useStore((state) => state.fetchOutlawMetadata);
    nftIds.foreach((nftId) => fetchOutlawMetadata(nftId));

    const outlawMetadata = useStore((state) => state.outlawMetadata);

    return {
        metadataMulti: nftIds.map((nftId) => outlawMetadata[nftId])
    }
}

export default function useOutlawMetadata(nftId) {
    const fetchOutlawMetadata = useStore((state) => state.fetchOutlawMetadata);
    fetchOutlawMetadata(nftId);

    const outlawMetadata = useStore((state) => state.outlawMetadata);

    return { metadata: outlawMetadata[nftId] }
}