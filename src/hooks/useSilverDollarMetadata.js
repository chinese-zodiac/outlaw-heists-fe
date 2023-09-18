import useStore from "../store/useStore";

export function useSilverDollarMetadataMulti(nftIds) {
    const fetchUstsdMetadata = useStore((state) => state.fetchUstsdMetadata);
    nftIds?.forEach((nftId) => fetchUstsdMetadata(nftId));

    const ustsdMetadata = useStore((state) => state.ustsdMetadata.filter((val) => nftIds?.includes(val?.nftId)));
    return {
        metadataMulti: ustsdMetadata.reduce((prev, metadata) => ({ ...prev, [metadata?.nftId]: metadata }), {})
    }
}

export default function useSilverDollarMetadata(nftId) {
    const fetchUstsdMetadata = useStore((state) => state.fetchUstsdMetadata);
    fetchUstsdMetadata(nftId);

    const ustsdMetadata = useStore((state) => state.ustsdMetadata[nftId]);

    return { metadata: ustsdMetadata }
}