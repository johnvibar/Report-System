export default function asyncWorker({ work, tasks, done, }: {
    work: () => void;
    tasks: {
        current: number;
    };
    done: () => void;
}): void;
