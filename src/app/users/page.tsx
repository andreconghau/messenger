import EmptyState from '../_components/EmptyState';

export async function generateMetadata() {
  return { title: 'Member List' };
}

const UserPage = () => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <EmptyState />
    </div>
  );
};

export default UserPage;
