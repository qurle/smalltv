await Bun.build({
	entrypoints: ['./index.html'],
	outdir: './dist',
	compile: true,
});