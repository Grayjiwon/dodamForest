export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6 mt-auto">
            <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
                <p className="mb-2 font-semibold text-gray-700">숲도담</p>
                <p>아이들이 즐겁게 뛰놀며 자연을 닮아가는 숲 체험 교육</p>
                <p className="mt-4">© {new Date().getFullYear()} Forest Dodam. All rights reserved.</p>
            </div>
        </footer>
    );
}
