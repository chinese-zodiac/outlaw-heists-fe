import useOutlawMetadata from '../../hooks/useOutlawMetadata';

export default function OutlawName({ nftId }) {
  const { metadata } = useOutlawMetadata(nftId);

  return <>{metadata?.name}</>;
}
