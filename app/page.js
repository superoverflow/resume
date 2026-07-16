import { getAllCVData } from '../lib/api';
import CV from '../components/CV';

export default async function Page() {
  const data = await getAllCVData();

  return <CV data={data} />;
}
